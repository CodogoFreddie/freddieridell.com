const {createFilePath} = require(`gatsby-source-filesystem`);

const path = require(`path`);

exports.onCreateNode = ({node, getNode, actions}) => {
	//this modifies data, adding a slug property to each markdown file
	//
	if (node.internal.type === `MarkdownRemark`) {
		const {createNodeField} = actions;

		const slug = '/' + node.frontmatter.type + createFilePath({node, getNode, basePath: `pages`});
		createNodeField({
			node,
			name: `slug`,
			value: slug,
		});
	}
};

exports.createPages = ({graphql, actions}) => {
	//this creates the pages,
	//first by generating listings for each post type,
	//then a page for each post

	const {createPage} = actions;
	return new Promise((resolve, reject) => {
		graphql(`
	  {
		allMarkdownRemark {
		  edges {
			node {
			  fields {
				slug
			  }
			  frontmatter {
				type
			  }
			}
		  }
		}
	  }
	`).then(result => {
		const types = new Set(
			result.data.allMarkdownRemark.edges.reduce(
				(types, {node}) => [...types, node.frontmatter.type],
				[],
			),
		);

		for (const type of types) {
			console.log(`/${type}/`);
			createPage({
				path: `/${type}/`,
				component: path.resolve(`./src/templates/listing.js`),
				context: {
					type,
				},
			});
		}

		result.data.allMarkdownRemark.edges.forEach(({node}) => {
			console.log(node.fields.slug);
			createPage({
				path: node.fields.slug,
				component: path.resolve(`./src/templates/post.js`),
				context: {
					slug: node.fields.slug,
				},
			});
		});

		resolve();
	});
	});
};
