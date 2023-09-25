import { useState, useEffect } from "react"
const PetFetcher = () => {
    const [pets, setPets] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("id")
     
          const fetchData = async () => {
              try {
                  const userPets = await fetch(`/api/pets/userpets/${userId}`, {
                      headers: {
                          "Authorization" : `Bearer ${token}`
                      }
                  });
                  const pets = await userPets.json();
                  setPets(pets)
  
              } catch (error) {
                  console.error('Error fetching user data:', error);
              }
          }
         
          fetchData();
        },[])

  return (
    <div>
      <h2>My Pets</h2>
      
        {pets.map((pet) => (
            <div key={pet.id}>
                    <h3 key={pet.id}>{pet.name}</h3>
                    <p>{pet.breed}</p>
                    <img
                            className="post-image"
                            src={pet.photo}
                            alt={`Post image ${pet.id}`}
                        />
            </div>
          
          // Replace "title" with the actual property name you want to display
        ))}
      
    </div>
  );
}
export default PetFetcher