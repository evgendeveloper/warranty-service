import uniq from 'lodash/uniq'

export default {
  currentDistrict: state => state.districts.find(district => district.selected),
  currentObject: state => state.objects.find(object => object.selected),
  sectionById: state => id => state.sections.find(section => section.id === id),
  floorsCount: state => Math.max(...state.sections.map(section => section.floors)) || 0,
  propertyById: state => id => state.properties.find(property => property.id === id),
  allTypes: state => uniq(state.properties.map(prop => prop['КоличествоКомнатСтрокой'])),
  allPrices: state => uniq(state.properties.map(prop => prop.price)),
  minPrice: (state, getters) => Math.min(...getters.allPrices),
  maxPrice: (state, getters) => Math.max(...getters.allPrices),
  allAreas: state => uniq(state.properties.map(prop => prop['ПлощадьОбщая'])),
  minArea: (state, getters) => Math.floor(Math.min(...getters.allAreas)),
  maxArea: (state, getters) => Math.ceil(Math.max(...getters.allAreas)),
  board: state => {
    let chess = {}
    let propertiesOfSection = {}

    const sections = state.sections
    const properties = state.properties.slice().sort((a, b) => a.numberonfloor - b.numberonfloor)

    for (const section of sections) {
      propertiesOfSection[section.id] = []
    }

    for (const prop of properties) {
      if (!propertiesOfSection[prop.id_entrance])
        propertiesOfSection[prop.id_entrance] = []

      propertiesOfSection[prop.id_entrance].push(prop)
    }

    for (const idSection in propertiesOfSection) {
      const section = sections.find(sec => sec.id === idSection)
      chess[idSection] = {
        ...section,
        propertiesOnFloor: {}
      }
      for (const prop of propertiesOfSection[idSection]) {
        const key = `floor_${prop.floor}`
        if (!chess[idSection].propertiesOnFloor[key])
          chess[idSection].propertiesOnFloor[key] = []

        chess[idSection].propertiesOnFloor[key].push(prop)
      }
    }

    return chess
  }
}
