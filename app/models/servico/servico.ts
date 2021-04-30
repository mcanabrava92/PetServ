import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const ServicoModel = types.model("Servico").props({
  id: types.identifierNumber,
  nome: types.maybe(types.string),
  
})

type ServicoType = Instance<typeof ServicoModel>
export interface Servico extends ServicoType {}
type ServicoSnapshotType = SnapshotOut<typeof ServicoModel>
export interface ServicoSnapshot extends ServicoSnapshotType {}
export const createServicoDefaultModel = () => types.optional(ServicoModel, {})
