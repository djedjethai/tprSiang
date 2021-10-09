const app = require("../../../index.js")
const Picmain = require('mongoose').model('Picmain')
const Review = require('mongoose').model('Review')
const request = require('supertest')

it('make sure the req return PicsStyle and reviews', async() => {
	// Arrange
	const picMainSample = new Picmain({
		pic:'http://urlMainPic.com'
	})
	const picMainSample2 = new Picmain({
		pic:'http://urlMainPic2.com'
	})
	const picMainSample3 = new Picmain({
		pic:'http://urlMainPic3.com'
	})

	// save datas
	await picMainSample.save()
	await picMainSample2.save()
	await picMainSample3.save()
	const revs = await saveReviews()

	// Act
	// const response = await session(app)
	const response = await request(app)
		.get(`/reviewsClient`)
		.send()
		.expect(200)

	// Assert
	expect(response.body.mainPics.length).toEqual(3)
	expect(response.body.reviews.length).toEqual(4)
	// make sure the reviews are sorted
	expect(response.body.reviews[0]._id.toString()).toEqual(revs.rev1._id.toString())
	expect(response.body.reviews[1]._id.toString()).toEqual(revs.rev2._id.toString())
})

async function saveReviews() {
	const reviewSample = new Review({
		name: 'myName',
		comment: 'this is my comment',
		pic: 'http://urlPic.com',
		quand: new Date('July 1, 2015')
	})
	const reviewSample1 = new Review({
		name: 'myName1',
		comment: 'this is my comment1',
		pic: 'http://urlPic1.com',
		quand: new Date('July 1, 2005')
	})
	const reviewSample2 = new Review({
		name: 'myName2',
		comment: 'this is my comment2',
		pic: 'http://urlPic2.com',
		quand: new Date('July 1, 2006')
	})
	const reviewSample3 = new Review({
		name: 'myName3',
		comment: 'this is my comment3',
		pic: 'http://urlPic3.com',
		quand: new Date('July 1, 2010')
	})

	const rev1 = await reviewSample.save()
	await reviewSample1.save()
	await reviewSample2.save()
	const rev2 = await reviewSample3.save()

	return {rev1, rev2}
}

