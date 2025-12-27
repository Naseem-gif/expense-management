import { use, useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [expense, setExpense] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const addExpense = (e) => {
    e.preventDefault();

    if (!name || !amount || !date || !category) {
      alert("All input fields are required");
      return;
    }

    if (amount <= 0) {
      alert("Amount must be greater than zero");
      return;
    }

    const newExpense = {
      id: Date.now(),
      name,
      amount: Number(amount),
      date,
      category,
    };

    setExpense([...expense, newExpense]);

    setName("");
    setDate("");
    setAmount("");
    setCategory("");
  };

  const deleteExpense = (id) => {
    setExpense((prevExpense) => prevExpense.filter((exp) => exp.id !== id));
  };

  const totalExpense = expense.reduce((sum, e) => sum + e.amount, 0);

  const filteredExpenses = expense.filter((exp) => {
    const matchDate = filterDate ? exp.date === filterDate : true;
    const matchCategory = filterCategory
      ? exp.category === filterCategory
      : true;

    return matchDate && matchCategory;
  });

  return (
    <>
      <div>
        <div>
          <h1>Expense Management System</h1>
        </div>
        <section>
          <h2>Expense Input</h2>
          <form onSubmit={addExpense}>
            <input
              type="text"
              value={name}
              placeholder="Expense name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              value={amount}
              placeholder="Amount"
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="text"
              value={category}
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
            />
            <button type="submit">Add Expense</button>
          </form>
        </section>
        <div>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />

          <input
            type="text"
            placeholder="Filter by category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />
        </div>
        <section>
          <h2>Expense List</h2>
          {expense.length === 0 ? (
            <h3>No expense found</h3>
          ) : (
            filteredExpenses.map((exp) => (
              <ul key={exp.id}>
                <li>{exp.name}</li>
                <li>{exp.amount}</li>
                <li>{exp.date}</li>
                <li>{exp.category}</li>
                <button onClick={() => deleteExpense(exp.id)}>Delete</button>
              </ul>
            ))
          )}
        </section>
        <section>
          <h2>Total Expense</h2>
          <h4>Rs {totalExpense}</h4>
        </section>
      </div>
    </>
  );
};

export default App;
