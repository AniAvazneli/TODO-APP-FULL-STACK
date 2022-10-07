async function getTodoes (){
    const response = await fetch('http://localhost:4000');
    
    return await response.json();
}


const deleteTodo = (id, element) => {
    console.log(id)
    fetch(`http://localhost:4000/${id}`, {
        method: "DELETE",
      })
      element.parentElement.parentElement.remove();
    }