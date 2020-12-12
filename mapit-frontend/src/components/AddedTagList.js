import styled from "styled-components/macro";

export default function AddedTagList({ addedTags }) {
  return (
    <TagList>
      {addedTags.map((tag, index) => (
        <TagListItem key={index}>{tag}</TagListItem>
      ))}
    </TagList>
  );
}

const TagList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TagListItem = styled.li`
  font-family: sans-serif;
  display: inline-block;
  border-radius: 3px;
  margin: 0.5rem;
  padding: 0.5rem 1.5rem;
  background: #64e9f5;
  color: black;
`;
