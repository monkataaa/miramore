import reqHandler from '../../utils/reqHandler'
import observer from '../../utils/observer'



const DeleteProductFromOrder = (productInfo) => {
    reqHandler.getUserData()
        .then(userData => {
            reqHandler.getOrderInfo(userData.order)
                .then(orderData => {
                    let updatedOrderData = orderData
                    let correctedProducts = updatedOrderData.products.filter(e => e !== productInfo._id)
                    updatedOrderData.products = correctedProducts
                    reqHandler.updateOrder(userData.order, updatedOrderData)
                        .then(updatedORder => {
                            observer.trigger(observer.events.notification, { type: 'success', message: "Продуктът беше премахнат от Вашата поръчка !" })
                            setTimeout(function () { observer.trigger(observer.events.hide) }, 3000);
                            return 'upsqh da go iztriq da go eba'
                        })
                })

        }).catch(err => console.log(err))
}

export default DeleteProductFromOrder 