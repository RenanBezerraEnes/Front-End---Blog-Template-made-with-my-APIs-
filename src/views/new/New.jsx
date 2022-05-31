import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Form, Dropdown } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

const NewBlogPost = (props) => {
	const [text, setText] = useState("");
	const handleChange = useCallback((value) => {
		setText(value);
	});

	const [title, setTitle] = useState("");
	const [category, setCategory] = useState("");
	const [cover, setCover] = useState("");
	const [readTimeValue, setReadTimeValue] = useState("");
	const [readTimeUnit, setReadTimeUnit] = useState("");
	const [author, setAuthor] = useState("");
	const [content, setContent] = useState("");

	const postBlog = async (e) => {
		const apiUrl = process.env.REACT_APP_BE_URL_BLOGPOSTS;
		const response = await fetch(`${apiUrl}/blogPosts`, {
			method: "POST",
			body: JSON.stringify({
				title,
				category,
				cover,
				readTime: { readTimeValue, readTimeUnit },
				author,
				content,
			}),
			headers: {
				Authorization: localStorage.getItem("accessToken"),
				"Content-type": "application/json",
			},
		});
		if (response.ok) {
			alert("Blog Posted");
			setTitle("");
			setCategory("");
			setCover("");
			setReadTimeValue("");
			setReadTimeUnit("");
			setAuthor("");
			setContent("");
		} else {
			alert("We have some problem, try again!");
		}
	};

	const [authorInfo, setAuthorInfo] = useState([]);
	const [selectedAuthor, setSelectedAuthor] = useState({});

	const getAuthors = async () => {
		const apiUrl = process.env.REACT_APP_BE_URL_AUTHORS;
		const response = await fetch(`${apiUrl}/authors`, {
			headers: {
				Authorization: localStorage.getItem("accessToken"),
				"Content-type": "application/json",
			},
		});
		const authorsApi = await response.json();
		console.log(authorsApi);
		if (response.ok) {
			setAuthorInfo(authorsApi);
		} else {
			alert("Blogs Error");
		}
	};

	useEffect(() => {
		getAuthors();
	}, []);

	// For selecte the correct Name
	const getSelectedAuthor = async () => {
		const apiUrl = process.env.REACT_APP_BE_URL_AUTHORS;
		const response = await fetch(`${apiUrl}/authors` + author, {
			headers: {
				Authorization: localStorage.getItem("accessToken"),
				"Content-type": "application/json",
			},
		});
		const authorsNameApi = await response.json();
		console.log(authorsNameApi);
		if (response.ok) {
			setSelectedAuthor(authorsNameApi);
		} else {
			alert("ERROR NAME");
		}
	};

	useEffect(() => {
		getSelectedAuthor();
	}, [author]);

	return (
		<Container className="new-blog-container">
			<Form className="mt-5" onSubmit={postBlog}>
				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Title</Form.Label>
					<Form.Control
						required
						size="lg"
						type="text"
						value={title}
						placeholder="Title"
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Category</Form.Label>
					<Form.Control
						required
						size="lg"
						type="text"
						value={category}
						placeholder="Category"
						onChange={(e) => {
							setCategory(e.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Cover</Form.Label>
					<Form.Control
						required
						size="lg"
						type="text"
						value={cover}
						placeholder="Cover"
						onChange={(e) => {
							setCover(e.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Readtime</Form.Label>
					<Form.Control
						required
						size="lg"
						type="number"
						value={readTimeValue}
						placeholder="value"
						onChange={(e) => {
							setReadTimeValue(e.target.value);
						}}
					/>

					<Form.Control
						required
						size="lg"
						type="text"
						value={readTimeUnit}
						placeholder="unit"
						onChange={(e) => {
							setReadTimeUnit(e.target.value);
						}}
					/>
				</Form.Group>

				<Dropdown className="my-3">
					<Dropdown.Toggle variant="dark" id="dropdown-basic">
						{selectedAuthor.name ? selectedAuthor.name : "Author"}
					</Dropdown.Toggle>

					<Dropdown.Menu>
						{authorInfo.authors &&
							authorInfo.authors.map((authorgetInfo) => (
								<Dropdown.Item
									key={authorgetInfo._id}
									value={author}
									onSelect={(e) => {
										setAuthor(authorgetInfo._id);
									}}
								>
									{authorgetInfo.name}
								</Dropdown.Item>
							))}
					</Dropdown.Menu>
				</Dropdown>

				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Content</Form.Label>
					<Form.Control
						required
						size="lg"
						type="text"
						value={content}
						placeholder="Content"
						onChange={(e) => {
							setContent(e.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group className="d-flex mt-3 justify-content-end">
					<Button type="reset" size="lg" variant="outline-dark">
						Reset
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
};

export default NewBlogPost;
