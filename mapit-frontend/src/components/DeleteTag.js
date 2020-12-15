import styled from "styled-components/macro";

export default function DeleteTag({ currentPlace }) {
  return <Delete onClick={onDeleteTag}>&times;</Delete>;
}

function onDeleteTag(currentPlace) {
  console.log(currentPlace);
}

const Delete = styled.span`
  margin-left: 0.8rem;
  color: #1b2536;
`;
