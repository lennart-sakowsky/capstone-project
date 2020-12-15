import styled from "styled-components/macro";

export default function DeleteTag() {
  return <Delete>&times;</Delete>;
}

const Delete = styled.span`
  margin-left: 0.8rem;
  color: #1b2536;
`;
