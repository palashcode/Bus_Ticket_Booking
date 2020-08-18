# Running the application
- clone the repo
- cd Bus_Ticket_booking
- npm install
- npm start
- call the APIs using postman collection "ticket_booking.postman_collection.json" 


# APIs

## (Create Ticket) 
### POST http://localhost:7894/tickets 
Provide json payload in following format
{ "seat_number":38,
	"booking_status":"Booked",
	"traveller": {
		"name": "ramdev",
		"phone": 8810311509
	}
}

## (Update booking status(open/close) and or user datails) 
### PATCH http://localhost:7894/ticket/?ticket_id=5e8af96f64035d83f67516e6
Query parameter: ticket_id
payload:
{
	"booking_status":"Booked",
	"traveller":{
		"name":"suresh",
		"phone":5310311501
	}
}

## (Get ticket by ticket_id)
### GET http://localhost:7894/ticket?ticket_id=5e8af96f64035d83f67516e6
Query parameter: ticket_id

## (Get open/notBooked tickets)
### GET http://localhost:7894/tickets/open

## (Get closed/Booked tickets)
### GET http://localhost:7894/tickets/closed

## (Get user by ticket_id)
### GET http://localhost:7894/user?ticket_id=5e8af96f64035d83f67516e6
Query parameter: ticket_id

## (Open all tickets booking_status=notBooked)
### DELETE http://localhost:7894/tickets

## (Delete all tickets ans users from database)
### DELETE http://localhost:7894/tickets
