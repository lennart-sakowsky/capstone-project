<?php

namespace App\Controller;

use App\Repository\PlaceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Serializer\PlaceSerializer;
use App\Services\FindPlace;
use App\Services\AuthenticationService;

class PlaceController extends AbstractController
{
    /**
     * @Route("/place", methods={"GET"})
     */
    public function findAllPlaces(Request $request, PlaceRepository $placeRepository, PlaceSerializer $placeSerializer, AuthenticationService $authentication): JsonResponse {
        $user = $authentication->isValid($request);

        if (is_null($user)) {
            return $this->json(['error' => 'Not authorized.'], JsonResponse::HTTP_UNAUTHORIZED);
        }
        
        var_dump($user); die;

        $places = $user->getPlaces();
        var_dump($places); 

        return new JsonResponse(
            $placeSerializer->serialize($places),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    /**
     * @Route("/place", methods={"POST"})
     */
    public function find(Request $request, PlaceSerializer $placeSerializer, FindPlace $findPlace, AuthenticationService $authentication): JsonResponse {
        $postData = $placeSerializer->deserialize($request->getContent());

        $user = $authentication->isValid($request);

        if (is_null($user)) {
            return $this->json(['error' => 'Not authorized.'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $places = $user->getPlaces();
        var_dump($places->getValues());

        if ($places->isEmpty() === true) {
            return new JsonResponse(
                $placeSerializer->serialize($postData),
                JsonResponse::HTTP_OK,
                [],
                true
            );
        }

        $place = $places->filter(function($requestedPlace) {
            return $requestedPlace->getName() === $postData->getName();
        }); 

        if (is_null($place)) {
            return new JsonResponse(
                $placeSerializer->serialize($postData),
                JsonResponse::HTTP_OK,
                [],
                true
            );
        }

        return new JsonResponse(
            $placeSerializer->serialize($place),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }
}
