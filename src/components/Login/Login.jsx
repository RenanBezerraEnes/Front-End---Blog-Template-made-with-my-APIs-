import React, { useState } from "react";
import "./Login.css";
import { Form, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const login = async (e) => {
		e.preventDefault();
		const apiUrl = process.env.REACT_APP_BE_URL_LOGIN;
		const response = await fetch(`${apiUrl}/login`, {
			method: "POST",
			body: JSON.stringify({
				email,
				password,
			}),
			headers: {
				"Content-type": "application/json",
			},
		});
		console.log(response);
		if (response.ok) {
			const body = await response.json();
			localStorage.setItem("accessToken", body.accessToken);
			alert("Welcome to Strive Blog Post!!!");
			navigate("/");
			setEmail("");
			setPassword("");
		} else {
			alert("Credentials are Invalid, please try again or contact our team!!!");
		}
	};

	// const loginWithGoogle = async (e) => {
	// 	const response = await fetch("http://localhost:3001/users/googleLogin", {
	// 		method: "GET",
	// 		body: JSON.stringify({
	// 			email,
	// 			password,
	// 		}),
	// 		headers: {
	//
	//
	// 			"Content-type": "application/json",
	// 		},
	// 	});
	// 	if (response.ok) {
	// 		const body = await response.json();
	// 		localStorage.setItem("accessToken", body.accessToken);
	// 		alert("Welcome to Strive Blog Post!!!");
	// 	}
	// };

	return (
		<Container className="login-container">
			<Form className="mt-5" onSubmit={login}>
				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Email</Form.Label>
					<Form.Control
						required
						size="lg"
						type="email"
						value={email}
						placeholder="Enter with your email address"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						required
						size="lg"
						type="password"
						value={password}
						placeholder="Enter with your password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group className="d-flex mt-3 justify-content-end">
					<Button
						size="lg"
						variant="dark"
						style={{
							marginLeft: "1em",
						}}
					>
						<a href="http://localhost:3001/users/googleLogin">Google</a>
					</Button>

					<Button
						as={Link}
						to="/register"
						size="lg"
						variant="dark"
						style={{
							marginLeft: "1em",
						}}
					>
						register
					</Button>

					<Button
						type="submit"
						size="lg"
						variant="dark"
						style={{
							marginLeft: "1em",
						}}
					>
						Submit
					</Button>
				</Form.Group>
			</Form>
		</Container>
	);
}
