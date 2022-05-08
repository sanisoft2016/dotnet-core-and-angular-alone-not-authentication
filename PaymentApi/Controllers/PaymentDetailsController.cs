using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PaymentApi.Models;

namespace PaymentApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentDetailsController : ControllerBase
    {
        private readonly PaymentContext _context;

        public PaymentDetailsController(PaymentContext context)
        {
            _context = context;
        }

        // GET: api/PaymentDetails
        [HttpGet]
        [Route("GetPaymentList")]
        public async Task<ActionResult<IEnumerable<PaymentDetails>>> GetPaymentList()
        {
            return await _context.PaymentDetails.ToListAsync();
        }

        // GET: api/PaymentDetails/5
        [HttpGet("GetPaymentDetails/{id}")]
        public async Task<ActionResult<PaymentDetails>> GetPaymentDetails(int id)
        {
            var paymentDetails = await _context.PaymentDetails.FindAsync(id);

            if (paymentDetails == null)
            {
                return NotFound();
            }

            return paymentDetails;
        }

        // PUT: api/PaymentDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("PutPaymentDetails")]
        public async Task<IActionResult> PutPaymentDetails(PaymentDetails paymentDetails)
        {
            if (paymentDetails.PaymentDetailId == 0)
            {
                return BadRequest();
            }

            _context.Entry(paymentDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentDetailsExists(paymentDetails.PaymentDetailId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PaymentDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]//PaymentDetails
        [Route("PostPaymentDetails")]
        public async Task<ActionResult<PaymentDetails>> PostPaymentDetails(PaymentDetails paymentDetails)
        {
            _context.PaymentDetails.Add(paymentDetails);
            await _context.SaveChangesAsync();

            var status = CreatedAtAction("GetPaymentDetails", new { id = paymentDetails.PaymentDetailId }, paymentDetails);

            return status;
        }

        // DELETE: api/PaymentDetails/5
        [HttpDelete("{id}")]
        [Route("DeletePaymentDetails/{id}")]
        public async Task<IActionResult> DeletePaymentDetails(int id)
        {
            var paymentDetails = await _context.PaymentDetails.FindAsync(id);
            if (paymentDetails == null)
            {
                var status = NotFound();
                return status;
            }

            _context.PaymentDetails.Remove(paymentDetails);
            await _context.SaveChangesAsync();
            var result = NoContent();
            return result;
        }

        private bool PaymentDetailsExists(int id)
        {
            return _context.PaymentDetails.Any(e => e.PaymentDetailId == id);
        }
    }
}
