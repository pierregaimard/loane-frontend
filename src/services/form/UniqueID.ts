interface UniqueID {
  getID: () => number
}

let UUID = 0

export default function UniqueID(): UniqueID {
  const getID: () => number = () => {
    UUID++
    return UUID
  }

  return {
    getID,
  }
}
