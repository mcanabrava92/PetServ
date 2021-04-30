import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PetModel } from "../pet/pet"
import { withEnvironment } from "../extensions/with-environment"
import { useStores } from "../index"

export const PetStoreModel = types
  .model("PetStore")
  .props({
    pets: types.optional(types.array(PetModel), []),
    pet: types.optional(types.number, 0),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setPetId: (id: number) => {
      self.pet = id;
    },
    savePets: (pets: any) => {
      self.pets.replace(pets)
    },
    savePet: (pet: any) => {
      if (self.pets.length === 0) {
        self.pets.push(pet)
      } else {
        const findIndex = self.pets.findIndex((item) => {
          return (item.id === pet.id)
        })
        if (findIndex >= 0) {
          self.pets.splice(findIndex, 1, pet)
        } else {
          self.pets.push(pet)
        }
      }
    },
    deletePet: (id: Number) => {
      console.log("Id: " + id)
      const findIndex = self.pets.findIndex((item) => {
        return (item.id === id)
      })
      if (findIndex >= 0) {
        self.pets.splice(findIndex, 1)
      }
    },
    getPetPorId: (id: Number) => {
      let pet = null;
      if (id) {
        pet = self.pets.find((item) => {
          return (item.id === id)
        })
      }
      return pet;
    },
  }))
  .actions((self) => ({
    mockPets: async () => {
      const { clienteStore } = useStores()
      const cliente = clienteStore.clientes[0]
      if (self.pets.length === 0) {
        const pets = [
          PetModel.create({
            id: 1,
            nome: "Pet 1",
            especie: "Cachorro", 
            idadeEmMeses: 1,
            imagem: "",
            clienteId: cliente ? cliente.id : null})
        ]
        self.savePets(pets)
      }
    },
  }))

type PetStoreType = Instance<typeof PetModel>
export interface PetStore extends PetStoreType {}
type PetStoreSnapshotType = SnapshotOut<typeof PetModel>
export interface PetStoreSnapshot extends PetStoreSnapshotType {}
export const createPetStoreDefaultModel = () => types.optional(PetModel, {})
