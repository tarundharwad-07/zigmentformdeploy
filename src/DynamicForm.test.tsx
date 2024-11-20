import { render, screen, fireEvent } from '@testing-library/react';
import DynamicForm from './DynamicForm';

const schema = {
  formTitle: "Test Form",
  formDescription: "This is a test form.",
  fields: [
    { id: "name", type: "text", label: "Name", required: true },
    { id: "email", type: "email", label: "Email", required: true },
    { id: "company", type: "select", label: "Company", required: true, options: [{ value: "tech", label: "Tech" }] },
  ]
};

test('renders form with correct fields', () => {
  render(<DynamicForm schema={schema} />);

  // Check if the title is rendered
  expect(screen.getByText("Test Form")).toBeInTheDocument();
  
  // Check if input fields are rendered
  expect(screen.getByLabelText("Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
  expect(screen.getByLabelText("Company")).toBeInTheDocument();
});

test('validates required fields', async () => {
  render(<DynamicForm schema={schema} />);
  
  fireEvent.submit(screen.getByRole('button'));

  // Check if validation error is shown for required fields
  expect(await screen.findByText('This field is required')).toBeInTheDocument();
});
