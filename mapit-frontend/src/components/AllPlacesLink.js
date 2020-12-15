import styled from "styled-components";

export default function AllPlacesLink({ updateTaggedPlaces }) {
  return <Link onClick={() => updateTaggedPlaces([])}>P</Link>;
}

const Link = styled.p`
  color: white;
`;
