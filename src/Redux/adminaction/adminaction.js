
export default function ADMIN(admin){
    return (
      {
        type :'admin-inform',
        data:admin
      }

    )
}


export  function adminItems(adItems){
    console.log("inside itemsAD==>",adItems)
    return (
      {
        type :'admin-Items',
        data:adItems
      }

    )
}