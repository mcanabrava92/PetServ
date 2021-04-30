import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PasseadorModel } from "../passeador/passeador"
import { withEnvironment } from "../extensions/with-environment"

const IMAGE_DEFAULT = "https://rickandmortyapi.com/api/character/avatar/1.jpeg"

export const PasseadorStoreModel = types
  .model("PasseadorStore")
  .props({
    passeadores: types.optional(types.array(PasseadorModel), []),
    passeador: types.optional(types.number, 0), 
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setPasseadorId: (id: number) => {
      self.passeador = id;
    },
    savePasseadores: (passeadores: any) => {
      self.passeadores.replace(passeadores)
    },
    savePasseador: (passeador: any) => {
      //passeador.imagem = IMAGE_DEFAULT;
      if (self.passeadores.length === 0) {
        self.passeadores.push(passeador)
      } else {
        const findIndex = self.passeadores.findIndex((item) => {
          return (item.id === passeador.id)
        })
        if (findIndex >= 0) {
          self.passeadores.splice(findIndex, 1, passeador)
        } else {
          self.passeadores.push(passeador)
        }
      }
    },
    deletePasseador: (id: Number) => {
      console.log("Id: " + id)
      const findIndex = self.passeadores.findIndex((item) => {
        return (item.id === id)
      })
      if (findIndex >= 0) {
        self.passeadores.splice(findIndex, 1)
      }
    },
    getPasseadorPorId: (id: Number) => {
      const find = self.passeadores.find((item) => {
        return (item.id === id)
      })
      return find
    },
  }))
  .actions((self) => ({
    mockPasseadores: async () => {
      if (self.passeadores.length === 0) {
        const passeadores = [
          PasseadorModel.create({ id: 1, nome: "Passeador 1", status: "Ativo", especialidade: "Clinico Geral", dataAtendimento: '30/04/2021', imagem: IMAGE_DEFAULT, petId:1 })
        ]
        self.savePasseadores(passeadores)
      }
    },
  }))

type PasseadorStoreType = Instance<typeof PasseadorModel>
export interface PasseadorStore extends PasseadorStoreType {}
type PasseadorStoreSnapshotType = SnapshotOut<typeof PasseadorModel>
export interface PasseadorStoreSnapshot extends PasseadorStoreSnapshotType {}
export const createPasseadorStoreDefaultModel = () => types.optional(PasseadorModel, {})
