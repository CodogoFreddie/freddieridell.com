import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data, }) => (
	<div>
		<h1>Hi people</h1>
		<p>Welcome to your new Gatsby site.</p>
		<p>Now go build something great.</p>
		<Link to="/page-2/">Go to page 2</Link>
	</div>
)

export default IndexPage

export const query = graphql`
	query AboutQuery {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark {
			edges {
				node {
					fileAbsolutePath
					html
					excerpt
					timeToRead
					fields {
						slug 
					}
					frontmatter {
						title
						published
					}
				}
			}
		}
	}
`
