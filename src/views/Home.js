import {
  Box,
  Stack,
  Image,
  Text,
  Button,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Logo from "../assets/images/logo.png";
import customer from "../assets/images/customer.png";
import sign from "../assets/images/Sign.png";
import { IoMdAdd } from "@react-icons/all-files/io/IoMdAdd";
import { RiArrowUpSLine } from "react-icons/ri";
import { Checkmark } from "react-checkmark";
import { FaCaretDown } from "react-icons/fa";
import { useToast } from "@chakra-ui/react"; 
import { FaCaretUp } from "react-icons/fa";
import { customerData } from "../reducers/useReducers";
import { useSelector } from "react-redux";
import Mask from "../assets/images/Mask.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { FaCheck } from "react-icons/fa";
import Card from "../components/Card/Card";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { GET } from "../utilities/ApiProvider";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState(null);
  const [bool, setBool] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [fields, setFields] = useState("");
  const [loading, setLoading] = useState(false);
  const selector = useSelector((state) => state);
  const [customersData, setCustomersData] = useState([]);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    image: "",
  });
  const toast = useToast();
  const getData = async () => {
    const res = await GET("https://reqres.in/api/users?page=1");
    setCustomersData(res?.data);
  };
  const uploadImage = async () => {
    if (!image) {
      toast({
        position: "bottom-left",
        isClosable: true,
        duration: "5000",
        description: "Please select the image first",
        status: "error",
      });
      return;
    }
    setLoaded(true);
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Personal_Info");
    formData.append("cloud_name", "dedi3pzhm");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dedi3pzhm/image/upload",
      formData,
      {}
    );
    if (res.status == 200) {
      setData({ ...data, image: res?.data?.url });
      console.log(res.data.url);
    }
    setLoading(false);
  };
  const createCustomers = () => {
    if (!data.name || !data.email || !data.image) {
      toast({
        position: "bottom-left",
        isClosable: true,
        duration: 5000,
        status: "error",
        description: "Please select all the fields to preceed further",
      });
      return;
    }
    setLoadings(true);
    const { name, image, email } = data;
    const [firstName, ...lastNameArr] = name.split(" ");
    const lastName = lastNameArr.join(" ");
    const updatedData = {
      id: customersData.length + 1,
      first_name: firstName,
      last_name: lastName,
      email,
      avatar: image,
    };
    setCustomersData((pre) => [...pre, updatedData]);
    console.log("maindata", [...customersData, updatedData]);
    dispatch(customerData([...customersData, updatedData]));
    setData({
      name: "",
      email: "",
      image: "",
    });
    setLoadings(false);
    setImage("");
  };
  const deleteCustomer = (id) => {
    const filter = customersData.filter((item) => item.id != id);
    setCustomersData(filter);
    dispatch(customerData(filter));
  };
  const change = () => {
    setBool(false);
    setData({
      name: "",
      email: "",
      image: "",
    });
  };
  const editCustomer = (item) => {
    onOpen();
    setBool(true);
    setCustomerId(item.id);
    setData({
      name: item.first_name + " " + item.last_name,
      email: item.email,
      image: item.avatar,
    });
  };
  const updateCustomerDetails = () => {
    const update = customersData.map((item) => {
      if (item.id === customerId) {
        if (!data.name || !data.email || !data.image) {
          toast({
            position: "bottom-left",
            isClosable: true,
            duration: 5000,
            status: "error",
            description: "Please select all the fields to proceed further",
          });
          return item;
        }

        const { name, image, email } = data;
        const [firstName, ...lastNameArr] = name.split(" ");
        const lastName = lastNameArr.join(" ");

        const updatedData = {
          id: item.id,
          first_name: firstName,
          last_name: lastName,
          email,
          avatar: image,
        };
        return updatedData;
      } else {
        return item;
      }
    });

    setCustomersData(update);
    dispatch(customerData(update));
    onClose();
  };

  useEffect(() => {
    const checkLocalStorage = async () => {
      if (localStorage.getItem("customers")) {
        const storedCustomers = JSON.parse(localStorage.getItem("customers"));
        if (storedCustomers) {
          setCustomersData(storedCustomers);
          dispatch(customerData(storedCustomers));
        }
      } else {
        getData();
      }
    };
  
    checkLocalStorage();
  }, []);


  return (
    <Stack direction={"row"}>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={"18px"}>
          <Box bgImage={`url(${Mask})`} backgroundSize="cover">
            <ModalHeader></ModalHeader>
            <ModalCloseButton
              color={"white"}
              onClick={() => {
                change();
              }}
            />
            <Box
              fontSize={{ base: "20px", md: "23px", lg: "28px" }}
              color={"white"}
              fontWeight={"700"}
              m={"20px 0"}
              textAlign={"center"}
            >
              {bool ? "Edit Customer" : "Add New Customer"}
            </Box>
          </Box>
          <ModalBody padding={"0 20px"}>
            <Input
              type="text"
              color={"gray"}
              value={data.name}
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
              margin={"15px 0"}
              placeholder="Customer Name"
            />
            <Input
              type="email"
              color={"gray"}
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
              margin={"15px 0"}
              placeholder="Email"
            />
            <Input
              type="file"
              id="upload"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              display={"none"}
            />
            <Box
              display={"flex"}
              justifyContent={{ base: "center", md: "left" }}
              alignItems={"center"}
              gap={"10px"}
              color={"#57BC90"}
              width={{ base: "100%", md: "fit-content" }}
              mb={"40px"}
            >
              <label htmlFor="upload">
                <Stack
                  justifyContent={{ base: "center", lg: "left" }}
                  direction={"row"}
                >
                  <Text
                    textAlign={{ base: "center", md: "left" }}
                    borderBottom={"1px solid #57BC90"}
                    alignItems={"center"}
                    cursor={"pointer"}
                  >
                    {loaded ? "Upload Photo" : "Upload Photo"}
                  </Text>
                </Stack>
              </label>
              {data.image && <FaCheck />}
              <Button
                _hover={"none"}
                isLoading={loading}
                onClick={uploadImage}
                color={"white"}
                bg={"#57BC90"}
              >
                upload
              </Button>
            </Box>
            <Box>
              {bool ? (
                <Button
                  width={"100%"}
                  onClick={updateCustomerDetails}
                  isLoading={loadings}
                  fontSize={{ base: "13px", md: "15px", lg: "17px" }}
                  color={"white"}
                  _hover={"none"}
                  bgGradient={"linear(to-l, #004B40, #57BC90)"}
                >
                  EDIt CUSTOMER
                </Button>
              ) : (
                <Button
                  width={"100%"}
                  onClick={createCustomers}
                  isLoading={loadings}
                  fontSize={{ base: "13px", md: "15px", lg: "17px" }}
                  color={"white"}
                  _hover={"none"}
                  bgGradient={"linear(to-l, #004B40, #57BC90)"}
                >
                  ADD CUSTOMER
                </Button>
              )}
            </Box>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Box
        bg={"#015249"}
        display={{ base: "none", lg: "block" }}
        minH={"100vh"}
        maxH={"auto"}
        borderTopRightRadius={"20px"}
        width={"350px"}
      >
        <Box padding={"35px 0"} paddingBottom={"80px"}>
          <Image width={"160px"} margin={"auto"} src={Logo} alt="image" />
        </Box>
        <Stack
          padding={"13px 10px"}
          boxShadow={"0px 5px 25px #00000040"}
          borderRadius={"10px"}
          margin="auto"
          direction={"row"}
          width={"195px"}
          alignItems={"center"}
          color={"white"}
          bg={"#043933"}
        >
          <Image src={customer} width={"20px"} alt="image" />
          <Text paddingLeft={"20px"} fontWeight={"400"}>
            CUSTOMERS
          </Text>
        </Stack>
      </Box>

      <Box width={"100%"} bg={"#F3F3F3"}>
        <Box padding={"30px"} bg={"white"}>
          <Text
            fontSize={{ base: "22px", md: "25px" }}
            textAlign={{ base: "center", md: "left" }}
            fontWeight={"700"}
          >
            CUSTOMERS
          </Text>
        </Box>
        <Box
          paddingLeft={{ base: "0", md: "28px" }}
          onClick={onOpen}
          display={"flex"}
          justifyContent={{ base: "center", md: "left" }}
          mx={"auto"}
          paddingBottom={"30px"}
          paddingTop={"30px"}
        >
          <Box
            width={"220px"}
            cursor={"pointer"}
            padding={"11px 0"}
            display={"flex"}
            justifyContent={"space-around"}
            alignItems={"center"}
            borderRadius={"10px"}
            bgGradient={"linear(to-l, #004B40, #57BC90)"}
          >
            <IoMdAdd color="white" fontSize={"20px"} />
            <Text fontSize={"14px"} color={"white"}>
              ADD NEW CUSTOMER
            </Text>
          </Box>
        </Box>
        <Box mt={"25px"}>
          <Box
            display={"flex"}
            mt={"30px"}
            flexDirection={"column"}
            gap={"20px"}
          >
            <Card
              editCustomer={editCustomer}
              deleteCustomer={deleteCustomer}
              setData={setData}
              data={data}
              customersData={customersData}
            />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
