const appKey = 'kid_Hk7NI6iMX'
const appSecret = '08132607ad7644e3a5d22c45c4f04095'
const hostUrl = 'https://baas.kinvey.com'

let reqHandler = {
    unauthorizedLogin : () => {
        return   fetch(`${hostUrl}/user/${appKey}`, {
            method: "POST",
            headers: {
                Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            return response.json()
        })
    },
    login : payload => {
        return   fetch(`${hostUrl}/user/${appKey}/login`, {
            method: "POST",
            headers: {
                Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then((response) => {
            return response.json()
        })
    },
    register : payload => {
      return    fetch(`${hostUrl}/user/${appKey}`, {
        method: "POST",
        headers: {
            Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((response) => {
        return response.json()
    })
    },
    pullProducts : () => {
        let token = localStorage.getItem('token')
        if (token === null) {
         token = 'c132bf14-8e5d-4cff-8135-43505109c25c.ikmzSHefwEjAD+otyeXDTbrg8Gob80IXJpwSo3V8Zuc='   
        }
        return fetch(`${hostUrl}/appdata/${appKey}/products?query={}&sort={"_kmd.ect": -1}`, {
            method: "GET",
            headers: {
                Authorization: 'Kinvey ' + token,
            }
        }).then(res => {return res.json()})
    },
    createProduct : payload => {
        return fetch(`${hostUrl}/appdata/${appKey}/products`, {
            method : 'POST',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(payload)
        }).then((response) => {
            return response.json()
        })
    },
    deleteProduct : (productId) => {
        return fetch(`${hostUrl}/appdata/${appKey}/products/${productId} `, {
            method : 'DELETE',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            return response.json()
        })
    },
    detailedProduct : productId => {
        let token = localStorage.getItem('token')
        if (token === null) {
         token = 'c132bf14-8e5d-4cff-8135-43505109c25c.ikmzSHefwEjAD+otyeXDTbrg8Gob80IXJpwSo3V8Zuc='   
        }
        return fetch(`https://baas.kinvey.com/appdata/${appKey}/products/${productId}`,{
            headers: {
                Authorization: 'Kinvey ' + token,
            }
        }).then(productDetails => {return productDetails.json()})
    },
    logout : () => {
        return fetch(`${hostUrl}/user/${appKey}/_logout`,{
            method : 'POST',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {return response})
    },
    getAllOrdersByUser : ()=>{
        return fetch(`${hostUrl}/appdata/${appKey}/orders?query={"creator":"${localStorage.getItem('userId')}"}&sort={"_kmd.ect": -1}`,{
            method : "GET",
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            return response.json()
        })
    },
    createNewOrder : () => {
        return fetch(`${hostUrl}/appdata/${appKey}/orders`,{
            method : 'POST',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                creator : localStorage.getItem('userId'),
                products : [],
                status : 'open'                   
            })
        })
        .then((response) => {
            return response.json()
        })
    },
    updateUser : (oldUserData, newOrderId) => {
        return fetch(`${hostUrl}/user/${appKey}/${localStorage.getItem('userId')}`, {
            method : 'PUT',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                address : oldUserData.address,
                phone : oldUserData.phone,
                order : newOrderId                
            })
        })
    },
    getUserData : (userId) => {
        if (!userId) {
          userId =   localStorage.getItem('userId')
        }
        return fetch(`${hostUrl}/user/${appKey}/${userId}`,{
            method : 'GET',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })  
        .then((response) => {
            return response.json()
        })

    },
    getOrderInfo : (orderId) => {
        return fetch(`${hostUrl}/appdata/${appKey}/orders/${orderId}`,{
            method: "GET",
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        })
        .then(res => {return res.json()})

    },
    updateOrder : (orderId , updatedOrderData) => {
        console.log('updatedOrderData ->', updatedOrderData);
        return fetch(`${hostUrl}/appdata/${appKey}/orders/${orderId}`, {
            method : 'PUT',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
               creator : updatedOrderData.creator,
               products : updatedOrderData.products,
               status : updatedOrderData.status,
               total :  updatedOrderData.total  
            })
        })
        .then((response) => {
            return response.json()
        })
    },
    getProductInfo : (productId) => {
        return fetch(`${hostUrl}/appdata/${appKey}/products/${productId}`, {
            method: "GET",
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        })
        .then(res => {return res.json()})
    },
    editProduct : (productId , updatedProductData) => {
        console.log('updatedProductData ->', updatedProductData);
        return fetch(`${hostUrl}/appdata/${appKey}/products/${productId}`, {
            method : 'PUT',
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                title : updatedProductData.title,
                price : updatedProductData.price,
                imageUrl : updatedProductData.imageUrl,
                description : updatedProductData.description,
                category : updatedProductData.category,
            })
        })
        .then((response) => {
            return response.json()
        })
    },
    getPendingOrders : () => {
        return fetch(`${hostUrl}/appdata/${appKey}/orders?query={"status":"pending"}&sort={"_kmd.ect": -1}`, {
            method: "GET",
            headers: {
                Authorization: 'Kinvey ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        })
        .then(res => {return res.json()})
    },
    deleteProductFromOrder : () => {
        return fetch(`https://baas.kinvey.com/appdata/app_id/comments/comment_id`, {

        })
    }
}

export default reqHandler