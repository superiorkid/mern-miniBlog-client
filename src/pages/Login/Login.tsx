import React, { FC, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  Link,
  Text,
} from "@chakra-ui/react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link as RRDLink } from "react-router-dom";
import { useMutation } from "react-query";
import { userLogin } from "../../api/Auth";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(5),
  })
  .required();

const Login: FC = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IUser>({
    resolver: yupResolver(schema),
  });
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation(userLogin);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const showPasswordHandler = () => setShowPassword((prevState) => !prevState);

    const onSubmitHandler = async (data: IUser) => {
        mutation.mutate(data, {
            onSuccess: (data, variables, context) => {
                localStorage.setItem("token", data.token)
                toast({
                    title: "Login successfully",
                    status: "success",
                    isClosable: true,
                    duration: 5000,
                    position: "bottom-right"
                })
                navigate('/')
            },
            onError: (error, variables, context) => {
                console.log(error)
                toast({
                    title: "Login error, check your email or password",
                    status: "error",
                    isClosable: true,
                    duration: 5000,
                    position: "bottom-right"
                })
            }
        })
    }

    return (
        <>
            <Box h="100vh" bg="gray.200">
                <Flex direction="column">
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <FormControl isInvalid={Boolean(errors.email)}>
                            <FormLabel>E-mail</FormLabel>
                            <Input type="text" placeholder="enter your email" {...register("email")} />
                            <FormErrorMessage>
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={Boolean(errors.password)}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? "text" : "password"} placeholder="enter your password"  {...register("password")} />
                                <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={showPasswordHandler}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>
                                {errors.password && errors.password.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Button mt="10px" colorScheme="blue" w="full" type="submit" isLoading={isSubmitting}>Sign In</Button>
                    </form>
                </Flex>
            </Box>
        </>
    )
}
