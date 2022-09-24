import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { gql } from "apollo-boost";
import Cart from "../components/cart";
import AppContext from "../context/AppContext";

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

const GET_PROJECT_INITIATIVES = gql`
  query($id: ID!) {
    project(id: $id) {
      id
      name
      initiatives {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

function Projects() {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_PROJECT_INITIATIVES, {
    variables: { id: router.query.id },
  });

  if (error) return "Error Loading Initiatives";
  if (loading) return <h1>Loading ...</h1>;
  if (data.project) {
    const { project } = data;
    function relativePath(url) { 
      let validation = new Boolean(url.slice(0, 4) != "http");
      // validation will always be true, therefore use validation.valueOf()
      return validation.valueOf();
    };
    return (
      <>
        <h1>{project.name}</h1>
        <Row>
          {project.initiatives.map((res) => (
            <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
              <Card style={{ margin: "0 10px" }}>
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
                  <Button
                    outline
                    color="primary"
                    onClick={() => appContext.addItem(res)}
                  >
                    + Add To Cart
                  </Button>

                  <style jsx>
                    {`
                      a {
                        color: white;
                      }
                      a:link {
                        text-decoration: none;
                        color: white;
                      }
                      .container-fluid {
                        margin-bottom: 30px;
                      }
                      .btn-outline-primary {
                        color: #007bff !important;
                      }
                      a:hover {
                        color: white !important;
                      }
                    `}
                  </style>
                </div>
              </Card>
            </Col>
          ))}
          <Col xs="3" style={{ padding: 0 }}>
            <div>
              <Cart />
            </div>
          </Col>
        </Row>
      </>
    );
  }
  return <h1>Add Initiatives</h1>;
}
export default Projects;