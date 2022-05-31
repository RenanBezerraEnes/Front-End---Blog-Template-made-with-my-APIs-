import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function Register() {
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [birthday, setBirthday] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const newUser = async (e) => {
		const apiUrl = process.env.REACT_APP_BE_URL;
		const response = await fetch(`${apiUrl}/users/register`, {
			method: "POST",
			body: JSON.stringify({
				name,
				surname,
				birthday,
				email,
				password,
			}),
			headers: {
				Authorization: localStorage.getItem("accessToken"),
				"Content-type": "application/json",
			},
		});
		if (response.ok) {
			alert("Congratulations, welcome to Strive Blog Post!!!");
			setName("");
			setSurname("");
			setBirthday("");
			setEmail("");
			setPassword("");
		} else {
			alert("Sorry something went wrong, Try again or contact our team!");
		}
	};

	return (
		<Container className="login-container">
			<Form className="mt-5" onSubmit={newUser}>
				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Name</Form.Label>
					<Form.Control
						value={name}
						required
						size="lg"
						type="text"
						placeholder="Your Name"
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Surname</Form.Label>
					<Form.Control
						value={surname}
						required
						size="lg"
						type="text"
						placeholder="Your Surname"
						onChange={(e) => {
							setSurname(e.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Birthday</Form.Label>
					<Form.Control
						value={birthday}
						required
						size="lg"
						type="date"
						placeholder="Your Birthday"
						onChange={(e) => {
							setBirthday(e.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Email</Form.Label>
					<Form.Control
						value={email}
						required
						size="lg"
						type="email"
						placeholder="Email Address"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						value={password}
						required
						size="lg"
						type="password"
						placeholder="Your password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group className="d-flex mt-3 justify-content-end">
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
