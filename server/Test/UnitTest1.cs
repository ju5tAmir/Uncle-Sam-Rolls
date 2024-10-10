using Application.DTOs.order;
using Application.Interfaces;
using API.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using Xunit;

namespace API.Tests.Controllers
{
    public class OrderControllerTests
    {
        private readonly Mock<IOrderService> _mockOrderService;
        private readonly OrderController _controller;

        public OrderControllerTests()
        {
            _mockOrderService = new Mock<IOrderService>();
            _controller = new OrderController(_mockOrderService.Object);
        }

        [Fact]
        public void GetAllOrders_ReturnsOkResult_WhenOrdersExist()
        {
            // Arrange
            var orders = new List<OrderResponseDto> { new OrderResponseDto { Id = 1 }, new OrderResponseDto { Id = 2 } };
            _mockOrderService.Setup(service => service.GetAllOrders()).Returns(orders);

            // Act
            var result = _controller.GetAllOrders();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(200, okResult.StatusCode);
            var returnedOrders = Assert.IsType<List<OrderResponseDto>>(okResult.Value);
            Assert.Equal(2, returnedOrders.Count);
        }

        [Fact]
        public void GetAllOrders_ReturnsBadRequest_OnException()
        {
            // Arrange
            _mockOrderService.Setup(service => service.GetAllOrders()).Throws(new Exception("Error occurred"));

            // Act
            var result = _controller.GetAllOrders();

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result.Result);
            Assert.Equal(400, badRequestResult.StatusCode);
            Assert.Equal("Error occurred", badRequestResult.Value);
        }

        [Fact]
        public void GetOrderById_ReturnsOrder_WhenOrderExists()
        {
            // Arrange
            var order = new OrderResponseDto { Id = 1 };
            _mockOrderService.Setup(service => service.GetOrderById(1)).Returns(order);

            // Act
            var result = _controller.GetOrderById(1);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(200, okResult.StatusCode);
            var returnedOrder = Assert.IsType<OrderResponseDto>(okResult.Value);
            Assert.Equal(1, returnedOrder.Id);
        }

        [Fact]
        public void GetOrderById_ReturnsBadRequest_OnException()
        {
            // Arrange
            _mockOrderService.Setup(service => service.GetOrderById(It.IsAny<int>())).Throws(new Exception("Order not found"));

            // Act
            var result = _controller.GetOrderById(1);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result.Result);
            Assert.Equal(400, badRequestResult.StatusCode);
            Assert.Equal("Order not found", badRequestResult.Value);
        }
    }
}
