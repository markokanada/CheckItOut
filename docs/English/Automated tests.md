# Testing Documentation

## Overview

The application is tested on multiple levels:

1. **Frontend Testing**: Using Selenium WebDriver
2. **API Testing**: Endpoint testing with PHPUnit
3. **Unit Testing**: Testing controller methods

## Frontend Tests (Selenium WebDriver)

### 1. Basic Frontend Test (`base.test.js`)

- **Purpose**: Verify proper loading of the main page
- **Tested features**:
    - Page load
    - Page title verification
    - Proxy configuration handling
- **Environment**: Chrome browser

### 2. Task Creation Test (`taskRecording.test.js`)

- **Purpose**: Test the task creation process
- **Tested features**:
    - Filling out form fields (title, description, deadline, priority)
    - Category selection
    - Invalid date validation
    - Form submission
    - Success feedback
- **Special checks**:
    - Handling future and past dates
    - Setting priority
    - Category selector behavior

## API Tests (PHPUnit)

### 1. Schedule API Tests (`ScheduleApiTest.php`)

- **Tested endpoints**:
    - `GET /api/schedules` - Listing
    - `POST /api/schedules` - Creation
    - `GET /api/schedules/{id}` - Retrieve one
    - `PUT /api/schedules/{id}` - Update
    - `DELETE /api/schedules/{id}` - Deletion
- **Test cases**:
    - Response status codes
    - JSON structure verification
    - Checking database effects
    - Factory-based test data generation

### 2. Task API Tests (`TaskApiTest.php`)

- **Tested endpoints**:
    - `GET /api/tasks` - Listing
    - `POST /api/tasks` - Creation
    - `GET /api/tasks/{id}` - Retrieve one
    - `PUT /api/tasks/{id}` - Update
    - `DELETE /api/tasks/{id}` - Deletion
- **Special checks**:
    - Verifying modified fields on update
    - Post-deletion database state
    - Handling multiple items simultaneously

## Unit Tests (PHPUnit)

### 1. Schedule Composer Test (`ScheduleTest.php`)

- **Tested method**: `scheduleComposer` in `ScheduleController`
- **Tested functionality**:
    - Sorting tasks by priority and deadline
    - Using mock object for `User` model
    - Expected result verification
- **Key assertions**:
    - Task ordering
    - Higher priority tasks come first
    - Earlier deadlines come first when priorities are equal

## Testing Strategy

1. **Test Environments**:
    - Separate frontend and backend environments
    - Chrome browser for Selenium
    - Automatic DB refresh before each test
2. **Test Data**:
    - Factories for random but consistent data
    - Mocks for complex dependencies
3. **Execution**:
    - JavaScript tests: Node.js environment
    - PHP tests: PHPUnit framework
4. **Reporting**:
    - Console output for each run
    - Detailed logging of errors

## Key Notes

1. **Time-Sensitive Tests**:
    - Date checks require special attention
    - Use of relative dates (e.g., yesterday, tomorrow)
2. **Asynchronous Operations**:
    - Proper wait times in Selenium
    - Use of explicit wait for element presence
3. **Database State**:
    - Clean state before each test
    - Use of `RefreshDatabase` trait

---

# Extended Testing Documentation

## Unit Tests – Extended

### 1. Task Model Tests (`TaskTest.php`)

#### 1.1 Status Getter

```php
public function test_get_statuses_returns_expected_array()
{
    $expectedStatuses = ["new", "in-progress", "finished", "expired"];
    $this->assertEquals($expectedStatuses, Task::getStatuses());
}
