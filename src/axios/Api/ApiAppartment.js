import custtomAxiosAprt from "../axios";

export default {
    show: async (id)=> {
        const data = await custtomAxiosAprt.get(`/${id}`)
        return data.data
    },
    getAll: async(currentPage) => {
      const data = await custtomAxiosAprt.get(`?${currentPage}`)
      return data.data
    },
    create: async (apprt) => {
        const data = await custtomAxiosAprt.post('/',apprt)
        return data.data
    },
    update: async (apprt,id) => {
        const data = await custtomAxiosAprt.post(`/${id}`,apprt)
        return data.data
    },
    delete: async (id) => {
        const data = await custtomAxiosAprt.delete(`/${id}`)
        return data.data
    }
}