import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import TableMain from './index';

describe("Render Table function", () => {

    test('renders TableMain with checkbox and sorting for Desktop component', () => {
        const tableConfig = {
            selectionType: 'multi',
            isSelection: true,
            isSortable:true,
            headers: [
                { value: "First Name", key: 'firstName' },
                { value: "Last Name", key: 'lastName' },
            ]
        }
        const rowData = [
            { firstName: "Ashray", lastName: "Shah" },
            { firstName: "Sanu", lastName: "Kumar" }
        ]
        const title = "User";

        const { getByTestId } = render(
            <TableMain
                tableConfig={tableConfig}
                rowData={rowData}
                getSelectedRow={jest.fn()}
                title={title}
            />
        );
        const checkbox = getByTestId("check-box-1")
        fireEvent.click(checkbox)
        const sortEvent = getByTestId("test-sort-1")
        fireEvent.click(sortEvent)
    });

    test('renders TableMain with radio for Desktop component', () => {
        const tableConfig = {
            selectionType: 'single',
            isSelection: true,
            isSortable:false,
            headers: [
                { value: "First Name", key: 'firstName' },
                { value: "Last Name", key: 'lastName' },
            ]
        }
        const rowData = [
            { firstName: "Ashray", lastName: "Shah" },
            { firstName: "Sanu", lastName: "Kumar" }
        ]
        const title = "User";

        const { getByTestId } = render(
            <TableMain
                tableConfig={tableConfig}
                rowData={rowData}
                getSelectedRow={jest.fn()}
                title={title}
            />
        );
        const radio = getByTestId("radio-box-1")
        fireEvent.click(radio)
    });

    test('renders TableMain with radio for Mobile component', () => {
        const tableConfig = {
            selectionType: 'single',
            isSelection: true,
            isSortable:false,
            headers: [
                { value: "First Name", key: 'firstName' },
                { value: "Last Name", key: 'lastName' },
            ]
        }
        const rowData = [
            { firstName: "Ashray", lastName: "Shah" },
            { firstName: "Sanu", lastName: "Kumar" }
        ]
        const title = "User";

        const stateSetter = jest.fn()
        jest.spyOn(React, 'useState').mockImplementation(isMobile => [isMobile = true, stateSetter])
        jest.spyOn(React, 'useState').mockImplementation(data => [data = [], stateSetter])

        const wrapper = render(
            <TableMain
                tableConfig={tableConfig}
                rowData={rowData}
                getSelectedRow={jest.fn()}
                title={title}
            />
        );
        expect(wrapper).toBeDefined();
    });

})