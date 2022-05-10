import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
	const [blogs, setBlogs] = useState([]);

	const getBlogs = async () => {
		const response = await fetch("http://localhost:3001/blogPosts", {
			headers: { "Content-type": "application/json" },
		});
		const blogsApi = await response.json();
		console.log(blogsApi);
		if (response.ok) {
			setBlogs(blogsApi.blog);
		} else {
			alert("Blogs Error");
		}
	};

	useEffect(() => {
		getBlogs();
	}, []);

	return (
		<Row>
			{blogs.map((blog) => (
				<Col
					md={4}
					style={{
						marginBottom: 50,
					}}
				>
					<BlogItem key={blog._id} {...blog} />
				</Col>
			))}
		</Row>
	);
};

export default BlogList;
