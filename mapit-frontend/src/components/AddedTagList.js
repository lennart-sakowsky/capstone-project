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
  max-width: 380px;
  margin-top: 0;
  padding: 0.2rem 0.5rem;
`;

const TagListItem = styled.li`
  display: inline-block;
  border-radius: 5px;
  margin: 0.3rem 0.3rem;
  padding: 0.4rem 0.6rem 0.4rem 0.6rem;
  font-weight: 600;
  font-size: 95%;
  letter-spacing: 1px;
  background: #ffdd29;
  color: #4f1e76;
  box-shadow: 1px 2px 3px 1px #210835;
`;
