import { useEffect, useState } from "react"
import { deleteIngredient, editIngredient, getAllIngredients, getIngredientById, postIngredient } from "../../managers/ingredientManager.js"
import { Button, Card, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap"
import "./Ingredient.css"
import { getAllTypes } from "../../managers/typeManager.js"

export const Ingredient = () => {
    const [initialIngredients, setInitialIngredients] = useState([])

    const [ingredients, setIngredients] = useState([])

    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

    const [editId, setEditId] = useState(null)
    const [deleteId, setDeleteId] = useState(null)

    const [types, setTypes] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedType, setSelectedType] = useState(null);

    const [ingredientToUpdate, setIngredientToUpdate] = useState({})

    const [ingredientToAdd, setIngredientToAdd] = useState({
        price: 0,
        calories: 0,
        name: "",
        typeId: 0
    })

    useEffect(() => {
        getAllIngredients().then(setInitialIngredients)
    }, [])

    useEffect(() => {
        setIngredients(initialIngredients)
    }, [initialIngredients])

    useEffect(() => {
        getAllTypes().then(setTypes)
    }, [])

    useEffect(() => {
        if (editId !== null) {
            getIngredientById(editId).then((data) => {
                setIngredientToUpdate(data)
            })
        }
    }, [editId])

    const toggleAddModal = () => setAddModal(!addModal)
    const toggleEditModal = () => {
        setEditModal(!editModal)
    }
    const toggleDeleteModal = () => setDeleteModal(!deleteModal)
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleIngredientDelete = () => {
        deleteIngredient(deleteId).then(() => {
            getAllIngredients().then(setInitialIngredients)
            toggleDeleteModal()
        })
    }

    const handleSelectType = (type) => {
        setSelectedType(type);
        if (editModal) {
            setIngredientToUpdate(prev => ({ ...prev, typeId: type.id }));
        }
        if (addModal) {
            setIngredientToAdd(prev => ({...prev, typeId: type.id }));
        }
        setDropdownOpen(false)
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setIngredientToUpdate(prev => ({ ...prev, [name]: value }));
    };

    const handlePostInputChange = (e) => {
        const { name, value } = e.target;
        setIngredientToAdd(prev => ({ ...prev, [name]: value }));
    };

    const handleNewIngredient = () => {
        if (ingredientToAdd.calories !== 0 && ingredientToAdd.typeId !== 0 && ingredientToAdd.name !== "") {
            setSelectedType(null)
            toggleAddModal()
            postIngredient(ingredientToAdd).then(() => {
                getAllIngredients().then(setInitialIngredients)
            })
        }
    }

    const handleUpdateIngredient = () => {
        if (ingredientToUpdate.calories !== 0 && ingredientToUpdate.typeId !== 0 && ingredientToUpdate.name !== "") {
            editIngredient(ingredientToUpdate.typeId, ingredientToUpdate).then(() => {
                toggleEditModal()
                setSelectedType(null)
                getAllIngredients().then(setInitialIngredients)
                setIngredientToUpdate({})
            })
        }
    }

    return(
        <div>
            <Card className="ingredients-container">
                <div className="ingredient-heading">
                    <h2>
                        Ingredients
                    </h2>
                    <Button
                        onClick={() => toggleAddModal()}
                        color="success"
                    >
                        Add Ingredient
                    </Button>
                </div>
                <Table striped className="ingredient-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Calories</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ingredients.map((i) => (
                                <tr key={i.id}>
                                    <td className="table-item">{i.name}</td>
                                    <td className="table-item">{i.type.name}</td>
                                    <td className="table-item">{i.price}</td>
                                    <td className="table-item">{i.calories}</td>
                                    <td className="ingredient-btns">
                                        <Button
                                            onClick={() => {setEditId(i.id); setEditModal(true)}}
                                            className="ingredient-btn"
                                            color="warning"    
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => {setDeleteId(i.id); setDeleteModal(true)}}
                                            className="ingredient-btn"
                                            color="danger"
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Card>
            <Modal isOpen={addModal} toggle={toggleAddModal}>
                    <ModalHeader toggle={toggleAddModal}>Add Ingredient</ModalHeader>
                    <ModalBody>
                        <div>
                            <Label>
                                Name
                            </Label>
                            <Input type="text" name="name" placeholder="Enter name..." onChange={handlePostInputChange}/>
                        </div>
                        <div>
                            <Label>
                                Price
                            </Label>
                            <Input type="text" name="price" placeholder="Enter price..." onChange={handlePostInputChange}/>
                        </div>
                        <div>
                            <Label>
                                Calories
                            </Label>
                            <Input type="text" name="calories" placeholder="Enter name..." onChange={handlePostInputChange}/>
                        </div>
                        <div>
                        <div>
                            <Label>Type</Label>
                            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                            <DropdownToggle caret>
                                {selectedType ? selectedType.name : 'Select a type'}
                            </DropdownToggle>
                                <DropdownMenu>
                                    {types.map((type) => (
                                        <DropdownItem key={type.id} onClick={() => handleSelectType(type)}>
                                            {type.name}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={() => handleNewIngredient()}>Add</Button>
                        <Button color="secondary" onClick={toggleAddModal}>Cancel</Button>
                    </ModalFooter>
            </Modal>

            <Modal isOpen={editModal} toggle={toggleEditModal}>
                    <ModalHeader toggle={toggleEditModal}>Edit Ingredient</ModalHeader>
                    <ModalBody>
                    <div>
                        <Label>Name</Label>
                        <Input name="name" value={ingredientToUpdate.name || ''} onChange={handleEditInputChange} />
                    </div>
                    <div>
                        <Label>Price</Label>
                        <Input name="price" type="number" value={ingredientToUpdate.price || ''} onChange={handleEditInputChange} />
                    </div>
                    <div>
                        <Label>Calories</Label>
                        <Input name="calories" type="number" value={ingredientToUpdate.calories || ''} onChange={handleEditInputChange} />
                    </div>
                    <div>
                        <Label>Type</Label>
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                            <DropdownToggle caret>
                                {selectedType ? selectedType.name : ingredientToUpdate.type?.name}
                            </DropdownToggle>
                            <DropdownMenu>
                                {types.map((type) => (
                                    <DropdownItem key={type.id} onClick={() => handleSelectType(type)}>
                                        {type.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={() => handleUpdateIngredient()}>Save</Button>
                        <Button color="secondary" onClick={() => { toggleEditModal(); setIngredientToUpdate({}); setSelectedType(null)}}>Cancel</Button>
                    </ModalFooter>
            </Modal>

            <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
                    <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this ingredient?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => handleIngredientDelete()}>Delete</Button>
                        <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
                    </ModalFooter>
            </Modal>
        </div>
    )
}