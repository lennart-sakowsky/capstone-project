export default async function deleteTag({currentPlace}) {
    const tagId =
    const placeId = currentPlace[0].name
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
  
    try {
      const response = await fetch(
        "http://mapit-backend.local/tag/{tagId}/place/{placeId}",
        requestOptions
      );
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  }
  