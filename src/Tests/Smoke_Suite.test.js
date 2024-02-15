import {render, screen, fireEvent} from '@testing-library/react';
import App from '../App'
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer'

describe('Smoke Tests', () => {

    test('Validate initial elements displayed', async () =>{
        const tree = renderer.create(<App/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Verify that entering a search term in the text input field and clicking the "Go" button triggers a search', async () =>{
        render(<App/>);
        const userInput = screen.getByRole("textbox", {id : "username"});
        const goButton = screen.getByRole("button", {type : "submit"});
        fireEvent.change(userInput, { target: { value: 'FcoJavierQA' }});
        fireEvent.click(goButton);
        expect(await screen.findByText("Found 2 Repos")).toBeInTheDocument();
        expect(await screen.findByText("ReportTest")).toBeInTheDocument();
    });

    test('Verify that if the error is due to a user not found on Github correct message is displayed', async () =>{
        render(<App/>);
        const userInput = screen.getByRole("textbox", {id : "username"});
        const goButton = screen.getByRole("button", {type : "submit"});
        fireEvent.change(userInput, { target: { value: 'Bad Information' }});
        fireEvent.click(goButton);
        expect(await screen.findByText("Github user not found")).toBeInTheDocument();
        expect(await screen.findByText("No repos")).toBeInTheDocument();
    });

});