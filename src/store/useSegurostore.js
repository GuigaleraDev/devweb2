import { useState, useEffect } from 'react'

const listeners = []

function notify() {
  listeners.forEach(fn => fn())
}

let data = {
  seguradoras: [],
  planos: [],
  coberturas: [],
  carros: [],
  tabelaPrecos: [],
  loading: true,
}

function createStore() {
  return {
    get seguradoras() { return data.seguradoras },
    get planos() { return data.planos },
    get coberturas() { return data.coberturas },
    get carros() { return data.carros },
    get tabelaPrecos() { return data.tabelaPrecos },
    get loading() { return data.loading },

    loadData() {
      fetch(`${import.meta.env.BASE_URL}data.json`)
        .then(r => r.json())
        .then(json => {
          data = {
            seguradoras: json.seguradoras || [],
            planos: json.planos || [],
            coberturas: json.coberturas || [],
            carros: json.carros || [],
            tabelaPrecos: json.tabelaPrecos || [],
            loading: false,
          }
          notify()
        })
        .catch(err => console.error("Erro ao carregar dados dinâmicos:", err))
    },

    addSeguradora(s) {
      const id = Date.now()
      data = { ...data, seguradoras: [...data.seguradoras, { ...s, id }] }
      notify()
    },
    updateSeguradora(s) {
      data = { ...data, seguradoras: data.seguradoras.map(x => x.id === s.id ? s : x) }
      notify()
    },
    deleteSeguradora(id) {
      data = { ...data, seguradoras: data.seguradoras.filter(x => x.id !== id) }
      notify()
    },

    addPlano(p) {
      const id = Date.now()
      data = { ...data, planos: [...data.planos, { ...p, id }] }
      notify()
    },
    updatePlano(p) {
      data = { ...data, planos: data.planos.map(x => x.id === p.id ? p : x) }
      notify()
    },
    deletePlano(id) {
      data = { ...data, planos: data.planos.filter(x => x.id !== id) }
      notify()
    },

    addCobertura(c) {
      const id = Date.now()
      data = { ...data, coberturas: [...data.coberturas, { ...c, id }] }
      notify()
    },
    updateCobertura(c) {
      data = { ...data, coberturas: data.coberturas.map(x => x.id === c.id ? c : x) }
      notify()
    },
    deleteCobertura(id) {
      data = { ...data, coberturas: data.coberturas.filter(x => x.id !== id) }
      notify()
    }
  }
}

const storeState = createStore()

export function useSeguroStore() {
  const [, rerender] = useState(0)

  useEffect(() => {
    const fn = () => rerender(n => n + 1)
    listeners.push(fn)
    return () => {
      const idx = listeners.indexOf(fn)
      if (idx >= 0) listeners.splice(idx, 1)
    }
  }, [])

  return storeState
}