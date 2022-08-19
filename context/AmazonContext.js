import { createContext, useState, useEffect } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { amazonAbi, amazonCoinAddress } from "../lib/constants";
import { ethers } from "ethers";

export const AmazonContext = createContext()

export const AmazonProvider = ({ children }) => {

    const [username, setUsername] = useState("")
    const [nickname, setNickname] = useState("")
    const [assets, setAssets] = useState([])

    const {
        authenticate,
        isAuthenticated,
        Moralis,
        enableWeb3,
        user,
        isWeb3Enabled
    } = useMoralis()

    const {
        data: assetsData,
        error: assetsDataError,
        isLoading: assetsDataisLoading

    } = useMoralisQuery('Nftassets')
   

    useEffect(() => {

        ; (async () => {

            if (isAuthenticated) {
                const currentUsername = await user?.get('nickname')
                setUsername(currentUsername)
            }
        })()

    }, [isAuthenticated, user, username])


    const buyAsset = async (price, src, productId) => {
        try {
            if (!isAuthenticated) return

            console.log(price, src, productId)


            const amount = ethers.BigNumber.from(price)
            const price1 = ethers.BigNumber.from('1000000000000')
            const calcPrice = amount.mul(price1)
            console.log(parseInt(calcPrice.toString()))
            const priceVal = parseInt(calcPrice.toString())
            const options = {
                contractAddress: amazonCoinAddress,
                functionName: 'buy',
                abi: amazonAbi,
                msgValue: calcPrice,
                params: {
                    price: priceVal,
                    img: src,
                    id: productId,
                    day: 30,
                }
            }
           // console.log(isWeb3Enabled);
            console.log(assetsData);
  
            if (isWeb3Enabled) {
                // const response = await Moralis.transfer(options)
               
                const transaction = await Moralis.executeFunction(options)
                console.log("hi");
                const receipt = await transaction.wait()
                console.log(receipt)
                // setBalance(response.toString())
            }
        } catch (error) {
            console.log(error)
        }

    }



    useEffect(() => {

        ; (async () => {

            if (isWeb3Enabled) {
                await getAssets()
            }
        })()


    }, [isWeb3Enabled, assetsData, assetsDataisLoading])

    const getAssets = async () => {
        try {
            await enableWeb3()
            //const assetAttributes = assetsData.map((val) => val.attributes)

            setAssets(assetsData);
          //  console.log(assetsData.length);
        } catch (error) {
            console.log(error)
        }
    }


    const handleSetUsername = () => {
        if (user) {
            if (nickname) {
                user.set('nickname', nickname) //adds another coloumn nickname into the users collection (DB)
                user.save()
                setNickname('')
            }
            else {
                console.log('Cant set empty nickname')
            }
        }
        else {
            console.log("No user connected")
        }
    }


    return (
        <AmazonContext.Provider
            value={{
                isAuthenticated,
                nickname,
                setNickname,
                username,
                handleSetUsername,
                assets,
                buyAsset
            }}
        >
            {children}
        </AmazonContext.Provider>
    )
}