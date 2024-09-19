import { Candidate } from "../types";

interface ICandidateApi {
  createCandidate(name: string): Promise<Candidate | null>;
  getCandidateByName(name: string): Promise<Candidate | null>;
  updateCandidate(id: string, name: string): Promise<Candidate | null>;
  deleteCandidate(id: string): Promise<Candidate | null>;
}

const candidates: Array<Candidate> = [];

export const candidateApi: ICandidateApi = {

  createCandidate: async (name) => {
    const id = crypto.randomUUID();
    const candidate: Candidate = {id, name};
    candidates.push(candidate);
    return candidate;
  },

  getCandidateByName: async (name) => {
    const candidate = candidates.find(c => c.name === name);
    return candidate ?? null;
  },

  updateCandidate: async (id, name) => {
    const toUpdate = candidates.findIndex(c => c.id === id);
    if (toUpdate === -1) return null;
    const candidate = {id, name};
    candidates[toUpdate] = candidate;
    return candidate;
  },

  deleteCandidate: async (id) => {
    const toDelete = candidates.findIndex(c => c.id === id);
    if (toDelete === -1) return null;
    const candidate = candidates.splice(toDelete, 1)[0];
    return candidate;
  }
};