import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ServicoModel } from "../servico/servico"
import { withEnvironment } from "../extensions/with-environment"

export const ServicoStoreModel = types
  .model("ServicoStore")
  .props({
    servicos: types.optional(types.array(ServicoModel), []),
    servico: types.optional(types.number, 0),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setServicoId: (id: number) => {
      self.servico = id;
    },
    saveServicos: (servicos: any) => {
      self.servicos.replace(servicos)
    },
    saveServico: (servico: any) => {
      if (self.servicos.length === 0) {
        self.servicos.push(servico)
      } else {
        const findIndex = self.servicos.findIndex((item) => {
          return (item.id === servico.id)
        })
        console.log(findIndex)
        if (findIndex >= 0) {
          self.servicos.splice(findIndex, 1, servico)
        } else {
          self.servicos.push(servico)
        }
      }
    },
    deleteServico: (id: Number) => {
      console.log("Id: " + id)
      const findIndex = self.servicos.findIndex((item) => {
        return (item.id === id)
      })
      if (findIndex >= 0) {
        self.servicos.splice(findIndex, 1)
      }
    },
    getServicoPorId: (id: Number) => {
      let servico = null;
      if (id) {
        servico = self.servicos.find((item) => {
          return (item.id === id)
        })
      }
      return servico;
    },
  }))
  .actions((self) => ({
    mockServicos: async () => {
      if (self.servicos.length === 0) {
        const servicos = [
          ServicoModel.create({ id: 1, nome: "Servico 1", })
        ]
        self.saveServicos(servicos)
      }
    },
  }))

type ServicoStoreType = Instance<typeof ServicoModel>
export interface ServicoStore extends ServicoStoreType {}
type ServicoStoreSnapshotType = SnapshotOut<typeof ServicoModel>
export interface ServicoStoreSnapshot extends ServicoStoreSnapshotType {}
export const createServicoStoreDefaultModel = () => types.optional(ServicoModel, {})
