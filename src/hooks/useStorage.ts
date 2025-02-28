import AsyncStorage from "@react-native-async-storage/async-storage";
import { MotosProps } from "../types/moto.type";

const Key = "@motos"

const useStorage = () => {

    const getItem = async (): Promise<MotosProps[]> => {
        try {
            const motos = await AsyncStorage.getItem(Key)
            return motos && JSON.parse(motos) || []
        } catch (error) {
            console.log(error);
            return []
        }
    }

    const saveItem = async (newMoto: MotosProps) => {
        try {
            let cars = await getItem()

            let findCars = cars.find(motos => motos.id === motos.id)

            if (findCars) {
                return
            }

            cars.push(newMoto)

            await AsyncStorage.setItem(Key, JSON.stringify(cars))
            console.log("carro favoritado");
            

        } catch (error) {
            console.log("Erro ao salvar ", error);

        }
    }

    const removeItem = async (id: string): Promise<MotosProps[] | []> => {
        try {
            let motos = await getItem()

            let updateList = motos.filter(motos => {
                return(motos.id !== id)
            })

            await AsyncStorage.setItem(Key, JSON.stringify(updateList))

            return updateList
        } catch (error) {
            console.log(error);
            return []
        }
    }

    return {
        getItem,
        saveItem,
        removeItem
    }
}

export default useStorage;