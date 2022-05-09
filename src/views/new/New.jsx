import React, { useCallback, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
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
	const [readTime, setReadTime] = useState("");
	const [readTimeValue, setReadTimeValue] = useState("");
	const [readTimeUnit, setReadTimeUnit] = useState("");
	const [author, setAuthor] = useState("");
	const [authorName, setAuthorName] = useState("");
	const [authorAvatar, setAuthorAvatar] = useState("");
	const [content, setContent] = useState("");

	const postBlog = async (e) => {
		e.preventDefault();
		const response = await fetch("http://localhost:3001/blogPosts", {
			method: "POST",
			body: JSON.stringify({
				title,
				category,
				cover,
				readtime: { readTimeValue, readTimeUnit },
				author: { authorName, authorAvatar },
				content,
			}),
			headers: { "Content-type": "application/json" },
		});
		if (response.ok) {
			alert("Blog Posted");
			setTitle("");
			setCategory("");
			setCover("");
			setReadTime("");
			setReadTimeValue("");
			setReadTimeUnit("");
			setAuthor("");
			setAuthorName("");
			setAuthorAvatar("");
			setContent("");
		} else {
			alert("We have some problem, try again!");
		}
	};

	return (
		<Container className="new-blog-container">
			<Form className="mt-5" onSubmit={postBlog}>
				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Title</Form.Label>
					<Form.Control
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
						size="lg"
						type="number"
						value={readTimeValue}
						placeholder="value"
						onChange={(e) => {
							setReadTimeValue(e.target.value);
						}}
					/>

					<Form.Control
						size="lg"
						type="text"
						value={readTimeUnit}
						placeholder="unit"
						onChange={(e) => {
							setReadTimeUnit(e.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Author</Form.Label>
					<Form.Control
						size="lg"
						type="text"
						value={authorName}
						placeholder="name"
						onChange={(e) => {
							setAuthorName(e.target.value);
						}}
					/>
					<Form.Control
						size="lg"
						type="text"
						value={authorAvatar}
						placeholder="avatar"
						onChange={(e) => {
							setAuthorAvatar(e.target.value);
						}}
					/>
				</Form.Group>
				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Content</Form.Label>
					<Form.Control
						size="lg"
						type="text"
						value={content}
						placeholder="Content"
						onChange={(e) => {
							setContent(e.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group controlId="blog-content" className="mt-3">
					<Form.Label>Blog Content</Form.Label>
					<ReactQuill onChange={handleChange} className="new-blog-content" />
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
