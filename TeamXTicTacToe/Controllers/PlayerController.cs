﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TeamXTicTacToe.TicTacToe;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TeamXTicTacToe.Controllers
{
    [Route("players")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private IPlayerDAO playerDAO;

        public PlayerController(IPlayerDAO playerDAO)
        {
            this.playerDAO = playerDAO;
        }

        // GET: api/<PlayerController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<PlayerController>/5
        [HttpGet("{id}")]
        public Player GetPlayer(string id)
        {
            Player result = playerDAO.GetPlayer(id);
            return result;
        }

        // POST api/<PlayerController>
        [HttpPost()]
        public IActionResult CreatePlayer([FromBody] string id)
        {
            Player player = new Player();
            player.Id = id;
            if (playerDAO.CreatePlayer(player)) // Player succesfully created
            {
                return Ok(player);
            }
            else // Failed to create player
            {
                return BadRequest();
            }
        }

        // PUT api/<PlayerController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] string value)
        {
            return Ok();
        }

        // DELETE api/<PlayerController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
