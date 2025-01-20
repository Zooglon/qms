<h1>Quote My Shed</h1>

A place to track the different scripts, snippets and general project work for the QMS site.

<h3>To Do's -</h3>

FRONTEND -

- Remove roller door and solar panels from form option (if enough space?)
- Add colour picker option to the form - can I tweak product image size?
- MAP -
  - Full screen the map? especially on mobile - check google maps options
  - Auto add dimensions when you draw a line not just the shape.
- Maybe set up redirect page? 

FORM -

- Add repair/replace options
- Review rules - grey out options?
- ALL BUILDINGS WITH CLADDING add question in cladding - 'Cladding height (starting at roof going down)'
- please note, building height is relative to top of posts, not inlcuding roof space and any cantilevers (rewrite needed)
- grey out rather than hide next button
- Option for colour picker/palet - maybe link to new tab? or add in with building image?
- MONO - cantilver - add question 'is this on the high or low side?'
- Door sections in all forms to match mono pitch - make sure 'm' is on door measurements
- All intro and completion text in for the repair/replace

BACKEND -

- Add new supplier categories
- Wire up new supplier categories with form submit function
- Edit emails so that certain supplier types get certain info
- update supplier CMS to include the ID of quotes sent through.
- for supplier form and CMS options like 'sheds up to Xft long etc'
- set up an automation to customers - after 3 weeks? - 'have you recieved a quote? Did you accept the quote? maybe a 'chase' button?'
  - if YES - 'have you gone with any of those quotes?' - IF YES then green tick or handle in supplier database
- Set up budget warnings in google maps API and restrict API key somehow

SEO -
Terms and conditions for supplier subscription
Form will need email address and phone number adding

OTHER -

- Cookie banner add
- Update privacy policy, t&cs etc with email address when created
- Update google maps secret in secret file. Maybe custom element insteasd of iframe?

NOTES/COSTS -

- $2 a month for email - Need to move email and domain over to Wix for ease

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<h4>Have dones - </h4>

- Mezzanine height option, add m/ft 
- change 'floor image upload' to be image/video in name (see mono pitch)
- let designer know when email domain is live so he can set up - get instagram handle, - facebook
- change mm to m in all dimensions except post dimensions
- Site accesbility statement
- Check quotes are all 3/5/10 for forms
- Terms and conditions and privacy policy
- Set up contact us page
- Form will need email address and phone number adding
- if mobile, use 'greedy' gesturehandling - NEEDS TESTING
- Site accesbility statement
- Metric/Imperial at the end of the field - SEE Concrete Sl LENGTH
- remove measurement units and use '150mm/6"' in the other question options
- Check quotes are all 3/5/10 for forms
- Become a supplier button on the main form.
- restart form button on page
- bug - why does concrete slab not reset the form - FIXED
- All intro and completion text in for the building quotes [
Government grants are available, to check you availability click here:
https://www.gov.uk/find-funding-for-land-or-farms

        For planning permission and advice please visit:

        https://www.gov.uk/planning-permission-england-wales
        https://www.planningportal.co.uk

        All quotes based on a level site
        ]

-- text around the number of quotes like 'the average time to quote depends on the complexity of your quote but is usually a maximum of 4 weeks'.
-- Ensure all but concrete slab and mezz floor have the grant text added
-- Update form completon text

<h4>END Have dones - </h4>

from 18th Jan list -

Repair/replace option -

Solar panels, roller doors, guttering

Installation quote - quote from other steel erector
-- need to go to external labour(?) supplier AND the material supplier.

Would you like a quote for levelling - Groundworkers supplier
-- Needs to go to groundworkers - size and where it is.

Goundworkers NO list -

- What is building used for
- Internals

Labour supplier No list -

notes -

- include quote for concrete floor - send to groundworkers

- set up 'groundworks (earth)' and 'groundworks (concrete)' as supplier option

- set up 'steel erector (not supply)' as supplier option

- T&Cs suppliers must quote within X days of recieving a quote

- use area measure on solar panel form too - change to solar panel image?

- Progress bar? - unlikely at this point

- Header bar z-index 999999

- "i can't quote for this" option in supplier email - resends quote to someone else? - add a reason box?

- Supplier area where they can edit email address and what they quote for.

- 'Join out suppliers list - from £xxx a year!'

- Maybe a 'First 3 options are free and more are £xyz'

Repair replace, different boxes -

- dismantle - size of building, anything weird - does it have doors etc
- dismantle section
- re-roof - just roof section - existing size and quantities of sheets? Solar options?
- guttering - new form
- cladding - just cladding from mono pitch example
- Walls - just walls for now
- solar panels - form
- roller shutter doors - form

- for guttering, more interactive pictures? Click on your guttering to choose. all dimentions in MM
