import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { TosadorModel } from "../tosador/tosador"
import { withEnvironment } from "../extensions/with-environment"

const IMAGE_DEFAULT = "https://rickandmortyapi.com/api/character/avatar/1.jpeg"

export const TosadorStoreModel = types
  .model("TosadorStore")
  .props({
    tosadores: types.optional(types.array(TosadorModel), []),
    tosador: types.optional(types.number, 0), 
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setTosadorId: (id: number) => {
      self.tosador = id;
    },
    saveTosadores: (tosadores: any) => {
      self.tosadores.replace(tosadores)
    },
    saveTosador: (tosador: any) => {
      //tosador.imagem = IMAGE_DEFAULT;
      if (self.tosadores.length === 0) {
        self.tosadores.push(tosador)
      } else {
        const findIndex = self.tosadores.findIndex((item) => {
          return (item.id === tosador.id)
        })
        if (findIndex >= 0) {
          self.tosadores.splice(findIndex, 1, tosador)
        } else {
          self.tosadores.push(tosador)
        }
      }
    },
    deleteTosador: (id: Number) => {
      console.log("Id: " + id)
      const findIndex = self.tosadores.findIndex((item) => {
        return (item.id === id)
      })
      if (findIndex >= 0) {
        self.tosadores.splice(findIndex, 1)
      }
    },
    getTosadorPorId: (id: Number) => {
      const find = self.tosadores.find((item) => {
        return (item.id === id)
      })
      return find
    },
  }))
  .actions((self) => ({
    mockTosadores: async () => {
      if (self.tosadores.length === 0) {
        const tosadores = [
          TosadorModel.create({ id: 1, nome: "Tosador 1", status: "Ativo", especialidade: "Clinico Geral", dataAtendimento: '30/04/2021', imagem: IMAGE_DEFAULT, petId:1 })
        ]
        self.saveTosadores(tosadores)
      }
    },
  }))

type TosadorStoreType = Instance<typeof TosadorModel>
export interface TosadorStore extends TosadorStoreType {}
type TosadorStoreSnapshotType = SnapshotOut<typeof TosadorModel>
export interface TosadorStoreSnapshot extends TosadorStoreSnapshotType {}
export const createTosadorStoreDefaultModel = () => types.optional(TosadorModel, {})
