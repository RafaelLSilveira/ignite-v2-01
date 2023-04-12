import { useState } from 'react'
import './App.css'
import clipboard from './assets/clipboard.svg'
import plus from './assets/plus.svg'
import logo from './assets/todo-logo.svg'
import Item, { IItemDataProps } from './components/Item'

function App() {
  const [data, setData] = useState<IItemDataProps[]>([
  {
    checked: true,
    title: "Item 1",
    id: "kasasas"
  },
  {
    checked: false,
    title: "Item 2",
    id: "kasasa2212s"
  }
  ]);

  const [title, setTitle] = useState<string>("");

  const handleCheckClick = (id: string) => {
    setData(prevState => prevState.map(item => {
      if(item.id === id) {
        return {...item, checked: !item.checked};
      }

      return item;
    }))
  }

  const handleRemove = (id: string) => {
    setData(prevState => prevState.filter(item => item.id !== id));
  }

  const handleAdd = () => {
    const newData:IItemDataProps = {
      id: Math.random().toString(),
      title: title,
      checked: false
    };
    setData(prevState => [...prevState, newData]);
    setTitle("");
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTitle(e.target.value);
    e.stopPropagation();
  }

  return (
    <div className="App">
      <div className='todo-header'>
        <img src={logo} className="todo-logo" />
      </div>

      <div className='action-container'>
        <input type="text" id="insert-input" placeholder='Adicione uma nova tarefa' value={title} onChange={handleChangeInput}/>
        <div role='button' className='action-button' onClick={handleAdd}>
          Criar
          <img src={plus} />
        </div>
      </div>

      <div className='header-list'>
        <p style={{ color: "var(--blue)" }}>Tarefas criadas <span>{data.length}</span></p>
        <p style={{ whiteSpace: "nowrap"}}>Concluídas <span style={{ width: '50%' }}>{data.filter(item => item.checked)?.length} de {data.length}</span> </p>
      </div>

      {data.length > 0 && data.map((item) => (
        <Item key={item.id} data={item} handleCheckClick={handleCheckClick} handleRemove={handleRemove}/>
      ))}

      {data.length === 0 &&
        (<div className='empty-list'>
          <img src={clipboard} alt="Note list" />
          <p className='text'>Você ainda não tem tarefas cadastradas</p>
          <p className='text' style={{ fontWeight: 500 }}>Crie tarefas e organize seus itens a fazer</p>
        </div>)
        }
    </div>
  )
}

export default App
