import { create } from "zustand";
import { Candidate } from "../types";
import { candidateApi } from "../api/candidateApi";

interface ICandidateService {
  currentCandidate: Candidate | null;
  createCandidate(name: string): Promise<void>;
  fetchCandidateByName(name: string): Promise<void>;
  updateCandidate(id: string, name: string): Promise<void>;
  deleteCandidate(id: string): Promise<void>;
}
export const useCandidate = create<ICandidateService>((set) => ({
  currentCandidate: null,
  createCandidate: async (name) => {set({currentCandidate: await candidateApi.createCandidate(name)})},
  fetchCandidateByName: async (name) => {set({currentCandidate: await candidateApi.getCandidateByName(name)})},
  updateCandidate: async (id, name) => {set({currentCandidate: await candidateApi.updateCandidate(id, name)})},
  deleteCandidate: async (id) => {candidateApi.deleteCandidate(id); set({currentCandidate: null})}
}));