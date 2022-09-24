import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Link from "next/link";

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const QUERY = gql`
  {
    projects {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

function ProjectList(props) {
  const { loading, error, data } = useQuery(QUERY);
  if (error) return "Error loading projects";
  //if projects are returned from the GraphQL query, run the filter query
  //and set equal to variable projectSearch
  if (loading) return <h1>Fetching</h1>;
  if (data.projects && data.projects.length) {
    //relativePath
    function relativePath(url) { 
      let validation = new Boolean(url.slice(0, 4) != "http");
      // validation will always be true, therefore use validation.valueOf()
      return validation.valueOf();
    };
    //searchQuery
    const searchQuery = data.projects.filter((query) =>
      query.name.toLowerCase().includes(props.search)
    );
    if (searchQuery.length != 0) {
      return (
        <Row>
          {searchQuery.map((res) => (
            <Col xs="6" sm="4" key={res.id}>
              <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                {
                  relativePath(res.image.url) ? (
                    <CardImg
                      top={true}
                      style={{ height: 250 }}
                      src={`${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`}
                    />
                  ) : (
                    <CardImg
                      top={true}
                      style={{ height: 48 }}
                      src={`${res.image.url}`}
                    />
                  )
                }
                <CardBody>
                  <CardTitle>{res.name}</CardTitle>
                  <CardText>{res.description}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Link
                    as={`/projects/${res.id}`}
                    href={`/projects?id=${res.id}`}
                  >
                    <a className="btn btn-primary">View</a>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}

          <style jsx global>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
            `}
          </style>
        </Row>
      );
    } else {
      return <h1>No Projects Found</h1>;
    }
  }
  return <h5>Add Projects</h5>;
}

export default ProjectList;