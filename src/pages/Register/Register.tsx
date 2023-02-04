import React, { FC, useState } from 'react';
import {
    Box, Button,
    Flex,
    FormControl, FormErrorMessage,
    FormLabel,
    Input, InputGroup, useToast, InputRightElement, Text, Link
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { useMutation } from "react-query";
import { userRegister } from "../../api/Auth";
import { useNavigate, Link as RRDLink } from "react-router-dom";


const schema = yup.object({
    username: yup.string().min(3).required(),
    email: yup.string().email().required(),
    password: yup.string().min(5),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Password must match")
}).required()


const Register: FC = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<IUser>({ resolver: yupResolver(schema) })
    const mutation = useMutation(userRegister)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)


    const showPasswordHandler = () => setShowPassword((prevState) => !prevState)
    const showConfirmPasswordHandler = () => setShowConfirmPassword((prevState) => !prevState)

    const onSubmitHandler = (data: IUser) => {
        mutation.mutate(data, {
            onSuccess: (data, variables, context) => {
                toast({
                    title: "Register successfully, now you can login",
                    status: "success",
                    isClosable: true,
                    duration: 5000,
                    position: "bottom-right"
                })
                navigate('/login')
            },
            onError: (error, variables, context) => {
                console.log(error)
                toast({
                    title: "Register error",
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
                        <FormControl isInvalid={Boolean(errors.username)}>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" placeholder="enter your username" {...register("username")} />
                            <FormErrorMessage>
                                {errors.username && errors.username.message}
                            </FormErrorMessage>
                        </FormControl>
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
                                <Input placeholder="enter your password" type={showPassword ? "text" : "password"} {...register("password")} />
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
                        <FormControl isInvalid={Boolean(errors.confirmPassword)}>
                            <FormLabel>Confirm Password</FormLabel>
                            <InputGroup>
                                <Input placeholder="confirm your password" type={showConfirmPassword ? "text" : "password"}  {...register("confirmPassword")} />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={showConfirmPasswordHandler} >
                                        {showConfirmPassword ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>
                                {errors.confirmPassword && errors.confirmPassword.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Button mt="10px" colorScheme="blue" w="full" type="submit" isLoading={isSubmitting}>Register</Button>
                        <Text>Have an account? <Link as={RRDLink} to="/login">Login</Link></Text>
                    </form>
                </Flex>
            </Box>
        </>

    );
};

export default Register;