<?php

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Serializer\TagSerializer;
use App\Repository\TagRepository;
use App\Repository\PlaceRepository;
use App\Entity\Tag;
use App\Entity\Place;

class TagController extends AbstractController
{
    /**
     * @Route("/tag", methods={"GET"})
     */
    public function index(TagRepository $tagRepository, TagSerializer $tagSerializer): JsonResponse
    {
        $tags = $tagRepository->findAll();

        return new JsonResponse(
            $tagSerializer->serialize($tags),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    /**
     * @Route("/tag"), methods={"POST"}
     */
    public function create(Request $request, TagRepository $tagRepository, TagSerializer $tagSerializer): JsonResponse {
        $tag = $tagSerializer->deserialize($request->getContent());
        $tagRepository->save($tag); 

        return new JsonResponse(
            $tagSerializer->serialize($tag),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    /**
     * @Route("/tag/add"), methods={"POST"}
     */
    public function add(Request $request, TagRepository $tagRepository, PlaceRepository $placeRepository, TagSerializer $tagSerializer): JsonResponse {
        $postData = $tagSerializer->deserialize($request->getContent());

        $tag = new Tag();
        $tag->setName($postData->getName());

        $placeExists = $placeRepository->findOneBy([
            'name' => $postData->getPlaces()[0]->getName(),
            'street' => $postData->getPlaces()[0]->getStreet(),
            'zipcode' => $postData->getPlaces()[0]->getZipcode()
            ]
        );

        if(!($placeExists)) {
            $place = new Place();
            $place->setName($postData->getPlaces()[0]->getName());
            $place->setStreet($postData->getPlaces()[0]->getStreet());
            $place->setZipcode($postData->getPlaces()[0]->getZipcode());
            $place->setLatitude($postData->getPlaces()[0]->getLatitude());
            $place->setLongitude($postData->getPlaces()[0]->getLongitude());
            $placeRepository->save($place);
            $tag->addPlace($place);
        }

        $tag->addPlace($placeExists);
        $tagRepository->save($tag);

        return new JsonResponse(
            $tagSerializer->serialize($tag),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }
}
