import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Modelo Veterinário.
 */
export const PasseadorModel = types.model("Passeador").props({
  id: types.identifierNumber,
  nome: types.maybe(types.string),
  especialidade: types.maybe(types.string),
  status: types.maybe(types.string),
  dataAtendimento: types.maybe(types.string),
  imagem: types.maybe(types.string),
  petId: types.maybe(types.integer),
})

type PasseadorType = Instance<typeof PasseadorModel>
export interface Passeador extends PasseadorType {}
type PasseadorSnapshotType = SnapshotOut<typeof PasseadorModel>
export interface PasseadorSnapshot extends PasseadorSnapshotType {}
export const createPasseadorDefaultModel = () => types.optional(PasseadorModel, {})
