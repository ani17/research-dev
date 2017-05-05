import socket
import time


HOST, PORT = '', 8888
REQUEST_QUEUE_SIZE = 5

def service_request():
	
	listen_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	listen_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
	listen_socket.bind((HOST, PORT))
	listen_socket.listen(REQUEST_QUEUE_SIZE)
	print ('Serving HTTP on port %s ...' % PORT)
	
	while True:
		client_connection, client_address = listen_socket.accept()
		handle_request(client_connection)
		client_connection.close()

def handle_request(client_connection):
    
    request = client_connection.recv(1024)
    print (request)

    http_response = """
	HTTP/1.1 200 OK

	Hello, World!
	"""
    
    time.sleep(10)
    client_connection.sendall(bytes(http_response,'utf_8'))


if __name__ == '__main__':
	service_request()
